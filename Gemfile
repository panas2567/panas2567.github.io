source "https://rubygems.org"

gem "github-pages", "~> 232", group: :jekyll_plugins

gem "tzinfo-data"
gem "wdm", "~> 0.1.0" if Gem.win_platform?

gem "minimal-mistakes-jekyll"

gem "faraday-retry"  # silences the Faraday v2 message
gem "ostruct"        # Ruby 3.5+ deprecates it as default
gem "webrick"        # needed for some Ruby 3 setups

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jemoji"
  gem "jekyll-include-cache"
  gem "jekyll-algolia"
end
