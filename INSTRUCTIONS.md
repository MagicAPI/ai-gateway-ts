As a Seniors software engineer your task is to create an AI gateway, which is similar to API getateways, but it needs to support streaming of responses. You should also support all kinds of elements as models to be proxy based on the given request and response structure that we will see this document below.

Try to use the fastest server library that you can find for this task. The fastest library is HONO with docs @HONO.md

Your house is to create AI gateway that is very performance and is in typescript with all the different kind of things you should handle is kind of requesting responses is mean purpose so if you look at the request, it should convert them and send them to the respective back and the provider.


 So your task is to basically create this kind of AI that we can basically enhance in the future to support the providers. This will be used by AI developers at API developers as well to use different kind of models just a single endpoint.





Making Requests
To make requests through the gateway, use the /v1/* endpoint and specify the provider using the x-provider header.

Example: OpenAI Request
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "x-provider: openai" \
  -H "Authorization: Bearer your-openai-api-key" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'


DIRECT OPENAI REQUEST
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'


Example: GROQ Request
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "x-provider: groq" \
  -H "Authorization: Bearer your-groq-api-key" \
  -d '{
    "model": "llama2-70b-4096",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true,
    "max_tokens": 300
  }'


Streaming Response:
{"created":1731066713,"model":"llama-3.1-8b-instant","choices":[{"index":0,"delta":{"content":" sl"},"logprobs":null,"finish_reason":null}]}
17:21:54
{"created":1731066713,"model":"llama-3.1-8b-instant","choices":[{"index":0,"delta":{"content":" in"},"logprobs":null,"finish_reason":null}]}
17:21:54
{"created":1731066713,"model":"llama-3.1-8b-instant","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}]}
17:21:54
{"created":1731066713,"model":"llama-3.1-8b-instant","choices":[{"index":0,"delta":{"content":" above"},"logprobs":null,"finish_reason":null}]}
17:21:54
{"created":1731066713,"model":"llama-3.1-8b-instant","choices":[{"index":0,"delta":{"content":" stars"},"logprobs":null,"finish_reason":null}]}
17:21:54
{"created":1731066713,"model":"llama-3.1-8b-instant","choices":[{"index":0,"delta":{"content":"The"},"logprobs":null,"finish_reason":null}]}


GROW DIRECT (This is what the AI gateway will send the reques to->)

curl --location 'https://api.groq.com/openai/v1/chat/completions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer gsk_api_key' \
--data '{
    "model": "llama-3.1-8b-instant",
    "messages": [
        {
            "role": "user",
            "content": "Write a poem"
        }
    ],
    "stream": true,
    "max_tokens": 300
}'