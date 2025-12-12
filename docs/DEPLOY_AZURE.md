# Deploying to Azure Container Apps with `azd`

## Prerequisites
- Azure CLI and the `azd` CLI installed.
- Azure subscription with permissions to create resource groups, ACR, and Container Apps.
- Supabase project configured with `supabase-schema.sql`.

## Steps
1. Sign in and initialize:
   ```bash
   azd auth login
   azd init --template .
   ```
2. Provision infrastructure defined in `infra/main.bicep`:
   ```bash
   azd up
   ```
   Provide values for:
   - `nextPublicSupabaseUrl`
   - `nextPublicSupabaseAnonKey`
   - `nextPublicSiteUrl`
   - `nextPublicAppEnv`
   - `supabaseServiceRoleKey` (stored as a Container App secret)
3. Build and push the Docker image:
   ```bash
   az acr build --registry <registryName> --image yorkixchange:latest .
   ```
4. Deploy the latest image to the Container App:
   ```bash
   az containerapp update \
     --name yorkixchange-app \
     --resource-group <resourceGroup> \
     --image <registryName>.azurecr.io/yorkixchange:latest
   ```

## Deploy to Azure button
If hosting the template in a public repo, you can provide an ARM deploy button using the compiled template at `infra/main.json`:

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2F<OWNER>%2F<REPO>%2Fmain%2Finfra%2Fmain.json)

Replace `<OWNER>` and `<REPO>` accordingly. For local deployments, you can also run `azd up` against `infra/main.bicep` without the button.
