class User < ActiveRecord::Base
  attr_accessor :password, :password_confirmation

  mount_uploader :avatar, AvatarUploader

  before_create :generate_token
  before_save { |user| user.email.downcase! }
  before_save :generate_password_digest, if: :should_generate_password_digest?

  validates_presence_of :name, :email
  validates_confirmation_of :password
  validates_uniqueness_of :email, :access_token
  validates_presence_of :password, if: 'new_record?'
  validates_presence_of :password_confirmation, if: :password_changed?
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i

  class << self
    def authenticate(email, password)
      user = find_by(email: email)
      user && user.password_digest == encrypt(password) ? user : nil
    end

    def encrypt(password)
      Digest::SHA1.hexdigest(password)
    end
  end

  def to_json(options = {})
    options[:except] ||= [:password_digest, :token_expired_at]
    super(options)
  end

  private

  def generate_token
    begin
      self.access_token = SecureRandom.uuid.gsub(/\-/, '')
    end while self.class.exists?(access_token: access_token)
    self.token_expired_at = Time.zone.now
  end

  def generate_password_digest
    self.password_digest = self.class.send(:encrypt, password)
  end

  def should_generate_password_digest?
    new_record? || password.present?
  end

  def password_changed?
    password.present? && password_digest != self.class.encrypt(password)
  end
end
