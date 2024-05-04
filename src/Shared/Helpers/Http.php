<?php

namespace Src\Shared\Helpers;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use GuzzleHttp\Cookie\CookieJar;
use GuzzleHttp\Exception\RequestException;

class Http
{
	private $client;
	private $headers;
	private $baseUrl;

	function __construct($headers, $baseUrl)
	{
		$this->headers = $headers;
		$this->baseUrl = $baseUrl;
	}

    // public function request($requestType = "GET", $url, $payload = [], $params = [], $contentType = 'json', $cookies = [])
    // {
    //     $allowedRequestTypes = ["GET", "PUT", "POST", "DELETE"];

    //     if(!in_array ($requestType, $allowedRequestTypes)) {
    //         throw new Exception("HTTP request type must be in [". implode(", ", $allowedRequestTypes) . "], '${requestType}' given");
    //     };

    //     return $this->performRequest($url, $payload, $params, $cookies, $requestType, $contentType);
    // }

	public function post($url, $payload, $params = [])
	{
		return $this->performRequest($url, $payload, $params, 'POST');
	}

	public function get($timeout, $url, $params = [])
	{
		return $this->performRequest($timeout, $url, [], $params);
	}

	public function put($timeout, $url, $payload, $params = [])
	{
		return $this->performRequest($timeout, $url, $payload, $params, 'PUT');
	}

	public function delete($timeout, $url, $payload, $params = [])
	{
		return $this->performRequest($timeout, $url, $payload, $params, "DELETE");
	}

	public function postMultiPart($timeout, $url, $payload, $params = [])
	{
		return $this->performRequest($timeout, $url, $payload, $params, 'POST', 'multipart');
	}

	private function performRequest($timeout, $url, $payload = [], $params = [], $requestType = 'GET', $contentType = 'json')
	{
        $this->client = new Client();

		$url = $this->generateUrl($url, $params);

        try {
            $request = $this->client->request(
                $requestType,
                $url,
                [
                    RequestOptions::HEADERS => $this->headers,
                    $contentType => $payload,
                    'timeout' => $timeout,
                    'connect_timeout' => $timeout
                ]
            );
        } catch (RequestException $error) {
            $response = $error->getResponse();

            $statusCode = $response->getStatusCode();
            $reason = $response->getReasonPhrase();
            $content = $response->getBody()->getContents();

            throw new Exception("Code: {$statusCode}. Reason: {$reason}. Content: {$content}. Url: {$url}");
        }

		if (!in_array($request->getStatusCode(), [200, 201])) {
			$this->handleError($request);
		}

		$requestContent = $request->getBody()->getContents();

        return $requestContent;
	}

	private function generateUrl($url, $params)
	{
		$urlParams = "";
		if (is_array($params) && count($params)) {
			$urlParams = '?' . http_build_query($params);
		}
		return $this->baseUrl . $url . $urlParams;
	}

	private function handleError($error)
	{
		$statusCode = $error->getStatusCode();
		throw new Exception("ERROR HTTP REQUEST (STATUS_CODE: {$statusCode}): " . $error->getBody()->getContents());
	}
}
