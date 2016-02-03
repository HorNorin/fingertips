namespace :data do
  desc 'Generate tip dummy data'
  task dummy: :environment do
    ruby = Skill.create(name: 'Ruby')
    rails = Skill.create(name: 'Rails')
    angular = Skill.create(name: 'Angular')

    skills = [ruby, rails, angular]

    100.times do |i|
      skill = skills[i % 3]
      Tip.create(
        title: Faker::Name.name,
        duration: 400,
        skill: skill,
        description: Faker::Lorem.paragraph
      )
    end
  end
end
