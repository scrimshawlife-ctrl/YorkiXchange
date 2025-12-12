param location string = resourceGroup().location
param siteName string = 'yorkixchange-web'
param planName string = 'yorkixchange-asp'
param containerRegistryName string = 'yorkixchangeacr'
param imageName string = 'yorkixchange:latest'
param nextPublicSupabaseUrl string
param nextPublicSupabaseAnonKey string
param nextPublicSiteUrl string
param nextPublicAppEnv string = 'production'
param supabaseServiceRoleKey string

resource acr 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' = {
  name: containerRegistryName
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
    publicNetworkAccess: 'Enabled'
  }
}

resource plan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: planName
  location: location
  kind: 'linux'
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  properties: {
    reserved: true
  }
}

resource web 'Microsoft.Web/sites@2023-12-01' = {
  name: siteName
  location: location
  kind: 'app,linux,container'
  properties: {
    httpsOnly: true
    serverFarmId: plan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${acr.name}.azurecr.io/${imageName}'
      alwaysOn: true
      appSettings: [
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'true'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${acr.name}.azurecr.io'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_USERNAME'
          value: acr.listCredentials().username
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
          value: acr.listCredentials().passwords[0].value
        }
        {
          name: 'NEXT_PUBLIC_SUPABASE_URL'
          value: nextPublicSupabaseUrl
        }
        {
          name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
          value: nextPublicSupabaseAnonKey
        }
        {
          name: 'NEXT_PUBLIC_SITE_URL'
          value: nextPublicSiteUrl
        }
        {
          name: 'NEXT_PUBLIC_APP_ENV'
          value: nextPublicAppEnv
        }
        {
          name: 'SUPABASE_SERVICE_ROLE_KEY'
          value: supabaseServiceRoleKey
        }
        {
          name: 'PORT'
          value: '3000'
        }
      ]
    }
  }
}

output registryName string = acr.name
output registryLoginServer string = '${acr.name}.azurecr.io'
output webUrl string = 'https://${web.properties.defaultHostName}'
