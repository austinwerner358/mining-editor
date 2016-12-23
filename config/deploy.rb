# config valid only for current version of Capistrano
lock "3.7.1"

set :application, "mining-editor"
set :repo_url, "git@github.com:austinwerner358/mining-editor.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/mining-editor
set :deploy_to, "/var/www/mining-editor"

# NOTE: added these lines
set :use_sudo, true
set :branch, 'master'
set :bundle_without, %w{development test production_heroku firebase}.join(' ') 

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"
# NOTE: not using secrets.yml at this time, and database.yml is version controlled

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
# NOTE: keep track of linked_dirs to see when updates need to be made (also delete things in shared when they aren't needed anymore)
# NOTE: public/worlds is currently version contorlled and will be moved to S3, so it likely won't need to be put in shared

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
