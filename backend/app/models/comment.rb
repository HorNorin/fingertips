class Comment < ActiveRecord::Base
  self.per_page = FingertipsConfig.pagination.comment

  belongs_to :tip
  belongs_to :user

  has_many :debates, foreign_key: :opinion_id
  has_many :replies, through: :debates

  delegate :name, to: :user, prefix: 'author'

  validates_presence_of :tip
  validates_presence_of :user
end
