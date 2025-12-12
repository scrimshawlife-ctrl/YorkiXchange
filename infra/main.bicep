param location string = resourceGroup().location
param containerAppName string = 'yorkixchange-app'
param environmentName string = 'yorkixchange-env'
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

resource env 'Microsoft.App/managedEnvironments@2024-02-01-preview' = {
  name: environmentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: ''
        sharedKey: ''
      }
    }
  }
}

resource app 'Microsoft.App/containerApps@2024-02-01-preview' = {
  name: containerAppName
  location: location
  properties: {
    managedEnvironmentId: env.id
    configuration: {
      ingress: {
        external: true
        targetPort: 3000
      }
      registries: [
        {
          server: '${acr.name}.azurecr.io'
          username: acr.listCredentials().username
          passwordSecretRef: 'acr-password'
        }
      ]
      secrets: [
        {
          name: 'acr-password'
          value: acr.listCredentials().passwords[0].value
        }
        {
          name: 'supabase-service-role-key'
          value: supabaseServiceRoleKey
        }
      ]
      env: [
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
          secretRef: 'supabase-service-role-key'
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'yorkixchange'
          image: '${acr.name}.azurecr.io/${imageName}'
          resources: {
            cpu: 0.5
            memory: '1Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 3
      }
    }
  }
}

output registryName string = acr.name
output containerAppEndpoint string = app.properties.configuration.ingress.fqdn
