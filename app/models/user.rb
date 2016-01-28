class User < ActiveRecord::Base
  DEFAULT_SKY_COLOR = 11_055_797
  ALT_SKY_COLOR = 1_193_086
  NORMAL_SKY_COLOR = 3_697_624

  def self.default_sky_color
    NORMAL_SKY_COLOR.to_s(16).upcase
  end

  def sky_color_hex=(value)
    update_attribute(:sky_color, value.to_i(16))
  end

  def sky_color_hex
    read_attribute(:sky_color).to_s(16).upcase.rjust(6, '0') unless sky_color.blank?
  end

  def position
    [pos_x, pos_y, pos_z]
  end
end
