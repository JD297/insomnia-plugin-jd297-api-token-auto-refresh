# insomnia-plugin-jd297-api-token-auto-refresh

## Overview <a name="overview"></a>

Insomnia plugin that checks for an api token in response and saves it as a template variable.

## Usage <a name="usage"></a>

### Installation <a name="installation"></a>

#### Manual Installation
1. Download "insomnia-plugin-jd297-api-token-auto-refresh-{version}.zip" from [Releases > Assets](https://github.com/JD297/insomnia-plugin-jd297-api-token-auto-refresh/releases)
2. Go to Application > Preferences > Plugins
3. Click "Reveal Plugins Folder"
4. Extract the ZIP file from step 1 to the "plugins" folder
5. Click "Reload Plugins"

### Configuration <a name="configuration"></a>

#### Manual Configuration
Update your [environment](https://docs.insomnia.rest/insomnia/environment-variables/):
1. Click "Manage Environments"
2. Create a "jd297-api-token-auto-refresh" environment variable with the response key you need:

Default
```json
{
  "jd297-api-token-auto-refresh": {
    "api_token_response_key": "token"
  }
}
```

Example
```json
{
  "jd297-api-token-auto-refresh": {
    "api_token_response_key": "access_token"
  }
}
```

### Functionality <a name="functionality"></a>

#### Automatic token refresh

Create a request for an auth route. E.g.:

```json
POST http://localhost:8000/api/oauth/token
{
    "grant_type": "client_credentials",
    "client_id": "...",
    "client_secret": "..."
}
```

The Plugin now looks for the "api_token_response_key" from our environment config in the response. If found the plugin
saves the data to a [Template Tag](https://docs.insomnia.rest/insomnia/template-tags). 
If the token is not valid any more just send the auth request again and the Template Tag will be refreshed everywhere you used it.

#### Template Tag
Now create a [Bearer Token](https://docs.insomnia.rest/insomnia/authentication#bearer-token) authentication. 
In the token field you can pass the Template Tag "jd297ApiTokenAutoRefreshApiToken". 


## Further Reading <a name="further-reading"></a>

* [Insomnia Plugins](https://docs.insomnia.rest/insomnia/introduction-to-plugins)
* [The Insomnia Plugin Hub](https://insomnia.rest/plugins)
