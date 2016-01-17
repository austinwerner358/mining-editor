class GameController < ApplicationController

  before_action :init_options, only: [:index]

  def index
  #   puts "PARAMS: #{params[:world_name]}"
  #   @world_name = params[:world_name] unless params[:world_name].blank?
  # end

  # def world_name
    puts "WORLD NAME: #{params[:world_name]}"
    puts "WORLDS:\n#{@worlds}"
    if !params[:world_name].blank? && @worlds.include?(params[:world_name].underscore)
      @world_name = params[:world_name] unless params[:world_name].blank?
    end
#    redirect_to root_url, params: params# {world_name: @world_name.underscore}
  end

  def init_options
    @worlds = []
    Dir.foreach('public/worlds') do |item|
      next if item == '.' or item == '..'
      # next unless File.directory? item
      puts item
      @worlds << item.underscore
    end
  end


end
