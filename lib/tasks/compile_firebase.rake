namespace :firebase do
  desc 'Compile assets and organize files to deploy to Firebase'
  task :compile do
    # Delete all compiled assets.
    require 'fileutils'
    if File.directory?("#{Rails.root}/public/assets")
      FileUtils.rm_r "#{Rails.root}/public/assets"
    end
    # Delete previously compiled files in the Firebase folder.
    if File.directory?("#{Rails.root}/firebase/public/game")
      FileUtils.rm_r "#{Rails.root}/firebase/public/game"
    end

    # Compile assets.
    puts 'Compiling assets for the Firebase environment...'
    print `RAILS_ENV=firebase bundle exec rake assets:precompile`
    puts 'DONE: ready to be moved...'

    # Create relevant directories for the Firebase app.
    paths = %w(javascripts stylesheets config jscolor shaders)
    new_path = "#{Rails.root}/firebase/public/game"
    paths.each do |path|
      sub_path = "#{new_path}/#{path}"
      FileUtils.mkdir_p(sub_path) unless File.directory?(sub_path)
    end

    # Move compiled assets and keep track of their new relative paths.
    files = { javascripts: [], stylesheets: [] }
    assets = Dir.glob(File.join(Rails.root, 'public/assets/**/*'))
    assets.each do |asset|
      extname = File.extname(asset)
      if %w(.js).include?(extname)
        # Don't include application.js for Firebase.
        next if asset.include?('application') # TODO: find a better way to exclude unneeded JavaScripts
        puts asset
        rel_path = "javascripts/#{File.basename(asset)}"
        files[:javascripts] << "game/#{rel_path}"
        new_file_path = "#{new_path}/#{rel_path}"
        FileUtils.mv asset, new_file_path
      elsif %w(.css).include?(extname)
        puts asset
        rel_path = "stylesheets/#{File.basename(asset)}"
        files[:stylesheets] << "game/#{rel_path}"
        new_file_path = "#{new_path}/#{rel_path}"
        FileUtils.mv asset, new_file_path
      end
    end

    # Remove other compiled assets.
    FileUtils.rm_r "#{Rails.root}/public/assets"

    # Move static assets.
    FileUtils.cp_r "#{Rails.root}/public/game/.", new_path

    # Move and modify index.html for new context.
    path_to_file = "#{Rails.root}/firebase/public/index.html"
    File.delete(path_to_file) if File.exist?(path_to_file)
    content = File.read("#{Rails.root}/app/views/game/index.html")
    tags = []
    files[:stylesheets].each do |path|
      tags << "<link rel=\"stylesheet\" type=\"text/css\" href=\"#{path}\">"
    end
    files[:javascripts].each do |path|
      tags << "<script type=\"text/javascript\" src=\"#{path}\"></script>"
    end
    File.open(path_to_file, 'w') do |io|
      io.write content.gsub('<!-- static linking placeholder -->', tags.join("\n    "))
    end # closes file

    # Create manifest.appcache to make the static app available offline.
    appcache_path = "#{Rails.root}/firebase/public/manifest.appcache"
    File.delete(appcache_path) if File.exist?(appcache_path)
    assets = Dir.glob(File.join(Rails.root, 'firebase/public/**/*'))
    File.open(appcache_path, 'w') do |f|
      f.write("CACHE MANIFEST\n")
      f.write("Version ##{Time.now.to_i}\n\n")
      f.write("CACHE:\n\n")
      assets.each do |asset|
        next if File.extname(asset) == ''
        filename_path = /#{Rails.root.to_s}\/firebase\/public\/(.*)/.match(File.absolute_path(asset))[1].to_s
        f.write(filename_path.concat("\n"))
      end
      f.write("\nNETWORK:\n")
      f.write("*\n")
      # TODO: add offline fallback (partially to see if manifest.appcache is working at all)
    end # closes file
  end

  desc 'Create appcache manifest file for Firebase'
  task :create_manifest do
  end
end
