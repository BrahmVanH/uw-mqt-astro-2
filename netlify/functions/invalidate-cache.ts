import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests for webhooks
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: 'Method Not Allowed',
        message: 'This endpoint only accepts POST requests'
      }),
    };
  }

  try {
    // Log the entire event for debugging
    console.log('Webhook received:', {
      timestamp: new Date().toISOString(),
      headers: event.headers,
      httpMethod: event.httpMethod,
      path: event.path,
      queryStringParameters: event.queryStringParameters,
    });

    // Parse and log the webhook payload
    let payload;
    try {
      payload = JSON.parse(event.body || '{}');
      console.log('Webhook payload:', JSON.stringify(payload, null, 2));
    } catch (parseError) {
      console.log('Raw webhook body (not JSON):', event.body);
      payload = { rawBody: event.body };
    }

    // Log specific WordPress webhook headers if present
    const wpHeaders = Object.keys(event.headers).filter(key =>
      key.toLowerCase().includes('wp') ||
      key.toLowerCase().includes('wordpress') ||
      key.toLowerCase().includes('webhook')
    );

    if (wpHeaders.length > 0) {
      console.log('WordPress-related headers:',
        wpHeaders.reduce((acc, key) => {
          const headerValue = event.headers[key];
          if (headerValue) {
            acc[key] = headerValue;
          }
          return acc;
        }, {} as Record<string, string>)
      );
    }

    // Log the user agent to identify the webhook source
    if (event.headers['user-agent']) {
      console.log('User-Agent:', event.headers['user-agent']);
    }

    // Check for common WordPress webhook indicators
    const isWordPressWebhook =
      event.headers['user-agent']?.includes('WordPress') ||
      event.headers['x-wp-webhook'] ||
      payload.source === 'wordpress' ||
      payload.post_type ||
      payload.post_id;

    if (isWordPressWebhook) {
      console.log('✅ Identified as WordPress webhook');
    } else {
      console.log('ℹ️  Webhook source not identified as WordPress');
    }

    // Respond with success
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Webhook received and logged successfully',
        timestamp: new Date().toISOString(),
        payloadReceived: !!event.body
      }),
    };

  } catch (error) {
    console.error('Error processing webhook:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: 'Failed to process webhook'
      }),
    };
  }
};