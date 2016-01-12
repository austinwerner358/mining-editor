class User < ActiveRecord::Base
  DEFAULT_SKY_COLOR = 11_055_797

  def self.default_sky_color
    DEFAULT_SKY_COLOR.to_s(16).upcase
  end

  def sky_color_hex=(value)
    update_attribute(:sky_color, value.to_i(16))
  end

  def sky_color_hex
    read_attribute(:sky_color).to_s(16).upcase
  end
end
