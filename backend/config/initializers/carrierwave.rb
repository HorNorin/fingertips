CarrierWave.configure do |config|
  storage = FingertipsConfig.carrierwave.storage.to_sym
  config.storage = storage

  if storage == :fog
    config.fog_public      = false
    config.fog_attributes  = { 'Cache-Control' => "max-age=#{365.day.to_i}" }
    config.fog_directory   = ENV['fog_directory']
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['aws_access_key_id'],
      aws_secret_access_key: ENV['aws_secret_access_key'],
      region: ENV['aws_region'],
      host: ENV['aws_host'],
      endpoint: ENV['aws_endpoint']
    }
  else
    config.asset_host = ActionController::Base.asset_host
  end
end
