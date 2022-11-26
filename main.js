const PLUGIN_NAME = 'jd297-api-token-auto-refresh';
const PLUGIN_TEMPLATE_TAG_TOKEN = 'jd297ApiTokenAutoRefreshApiToken';
const PLUGIN_TEMPLATE_TAG_TOKEN_DESCRIPTION = `API token from hooked request provided by the \"${PLUGIN_NAME}\" plugin.`;
const PLUGIN_CONFIG_RESPONSE_KEY = 'api_token_response_key';
const PLUGIN_TEMPLATE_TAG_TOKEN_DEFAULT_VALUE = 'token';

module.exports.responseHooks = [
    context => {
        const { response, request, store } = context;

        const config = request.getEnvironmentVariable(PLUGIN_NAME) ?? {};

        // set a default config value
        if (!config.hasOwnProperty(PLUGIN_CONFIG_RESPONSE_KEY)) {
            config[PLUGIN_CONFIG_RESPONSE_KEY] = PLUGIN_TEMPLATE_TAG_TOKEN_DEFAULT_VALUE;
        }

        try {
            const data = JSON.parse(response.getBody().toString('utf-8'));

            if (!data.hasOwnProperty(config[PLUGIN_CONFIG_RESPONSE_KEY])) {
                return;
            }

            store.setItem(PLUGIN_TEMPLATE_TAG_TOKEN, data[config[PLUGIN_CONFIG_RESPONSE_KEY]]);
        } catch (e) {

        }
    }
];

module.exports.templateTags = [
    {
        name: PLUGIN_TEMPLATE_TAG_TOKEN,
        description: PLUGIN_TEMPLATE_TAG_TOKEN_DESCRIPTION,
        async run (context) {
            const { store } = context;

            return store.getItem(PLUGIN_TEMPLATE_TAG_TOKEN);
        }
    }
];
