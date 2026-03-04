self.__uv$config = {
    prefix: '/active/uv/service/',
    bare: 'https://bare.benrocco.com/', // use a fast, reliable bare server
    encodeUrl: JavaScriptObfuscator.encode,
    decodeUrl: JavaScriptObfuscator.decode,
    handler: '/active/uv/uv.handler.js',
    client: '/active/uv/uv.client.js',
    bundle: '/active/uv/uv.bundle.js',
    config: '/active/uv/uv.config.js',
    sw: '/active/uv/uv.sw.js',
};
