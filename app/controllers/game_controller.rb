class GameController < ApplicationController
  # layout false
  # layout 'application', :except => :view

  before_action :init_options, only: [:index, :world_name, :controls]

  def index
    user = User.first || User.create
    # @local = user.local
    # user.update_attribute(:local, false) if @local
    @world_name = user.world_name
    @db_pos = user.position.join('+') unless user.pos_x.nil?
    @sky_color = user.sky_color_hex ? user.sky_color_hex : User.default_sky_color
  end

  def sky_color
    user = User.first || User.create
    user.sky_color_hex = params[:hex_color] unless params[:hex_color].blank?
    user.save!
    redirect_to root_url
  end

  def world_name
    puts "WORLD NAME: #{params[:world_name]}"
    puts "WORLDS:\n#{@worlds}"
    user = User.first || User.create
    if !params[:world_name].blank? && @worlds.include?(params[:world_name])
      if user.world_name != params[:world_name]
        user.pos_x = nil
        user.pos_y = nil
        user.pos_z = nil
      end
      user.world_name = params[:world_name]
      unless params[:pos_x].blank?
        user.pos_x = params[:pos_x]
        user.pos_y = params[:pos_y]
        user.pos_z = params[:pos_z]
      end
    end
    user.save!
    redirect_to "#{root_url}?worldName=#{params[:world_name]}"
  end

  def init_options
    @worlds = []
    Dir.foreach('public/worlds') do |item|
      next if item == '.' || item == '..' || item == '.DS_Store'
      # next unless File.directory? item
      @worlds << item
    end
    @worlds.sort!
  end

  def controls
  end

  def help
  end

  def local_world
    User.first.update_attribute(:local, true)
    redirect_to "#{root_url}?local=true"
  end
end
