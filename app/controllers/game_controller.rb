class GameController < ApplicationController
  before_action :init_options, only: [:world_name, :controls]

  def index
    user = User.first || User.create
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
    redirect_to root_url
  end

  def init_options
    @worlds = []
    Dir.foreach('public/worlds') do |item|
      next if item == '.' || item == '..' || item == '.DS_Store'
      # next unless File.directory? item
      @worlds << item
    end
  end

  def controls
  end
end
