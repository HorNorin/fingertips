class Tip < ActiveRecord::Base
  self.per_page = 12

  belongs_to :skill

  delegate :name, to: :skill, prefix: true

  scope :search, ->(params) do
    begin
      tips = if params[:skill].present? && params[:q].present?
               joins(:skill).where('tips.title LIKE ? AND skills.name = ?', "%#{params[:q]}%", params[:skill])
             elsif params[:q].present?
               joins(:skill).where('tips.title LIKE ? OR skills.name = ?', "%#{params[:q]}%", params[:q])
             elsif params[:skill].present?
               skill = Skill.find_by(name: params[:skill])
               skill.tips
             else
               all
             end

      tips.paginate(page: params[:page])
    rescue
      raise ActiveRecord::RecordNotFound
    end
  end
end
