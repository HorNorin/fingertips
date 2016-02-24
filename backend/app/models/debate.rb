class Debate < ActiveRecord::Base
  belongs_to :opinion, class_name: 'Comment'
  belongs_to :reply,   class_name: 'Comment', counter_cache: true
end
