# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

Rails.application.config.assets.precompile += %w( mca.css )
Rails.application.config.assets.precompile += %w( ace/ace.js )
Rails.application.config.assets.precompile += %w( jscolor/jscolor.js )
# Rails.application.config.assets.precompile += %w( jscolor/arrow.gif )
# Rails.application.config.assets.precompile += %w( jscolor/cross.gif )
# Rails.application.config.assets.precompile += %w( jscolor/hs.png )
# Rails.application.config.assets.precompile += %w( jscolor/hv.png )

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
