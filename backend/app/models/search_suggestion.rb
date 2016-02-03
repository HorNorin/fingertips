class SearchSuggestion
  class << self
    def term_for(prefix)
      $redis.zrevrange "search-suggestion:#{prefix.downcase}", 0, 9
    end

    def index_tips
      Tip.find_each { |tip| index_tip(tip) }
    end

    def index_tip(tip)
      index_term(tip.title)
      index_term(tip.skill_name)
      tip.title.split.each { |t| index_term(t) }
    end

    def index_term(term)
      1.upto(term.length - 1) do |n|
        prefix = term[0, n]
        $redis.zincrby "search-suggestion:#{prefix.downcase}", 1, term.downcase
      end
    end
  end
end
