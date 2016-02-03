namespace :search_suggestion do
  desc 'Generate search suggestions from tips'
  task index: :environment do
    SearchSuggestion.index_tips
  end
end
