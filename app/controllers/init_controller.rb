class InitController < ApplicationController
  def index
    render json: {
      '1' => {
        'mask' => '0x00',
        'type' => 1,
        '0' => {
          'name' => 'Stone',
          'drawLevel' => 0,
          'shapeType' => 1,
          'useBiomeColor' => 0,
          'shapeName' => 'simpleBlock',
          'defaultTexture' => 'stone.png'
        }
      }
    }
  end
end
