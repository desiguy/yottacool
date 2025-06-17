async function verifyURLs() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    for (let i = 1; i <= 5; i++) {
        const urlInput = document.getElementById('url' + i);
        const url = urlInput.value.trim();
        const resultParagraph = document.createElement('p');

        if (url) {
            resultParagraph.textContent = \`Verifying \${url}... \`;
            resultsDiv.appendChild(resultParagraph);
            try {
                // Using 'no-cors' mode. We can't read the response directly,
                // but a successful fetch (even opaque) indicates the URL is likely reachable.
                // A network error will throw an exception.
                const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });

                // For 'no-cors', response.ok and response.status are not directly usable as they are often 0 or false.
                // The key is that fetch() itself completes without throwing a network error.
                // This isn't a perfect test for "launchable in browser" as some sites might block HEAD requests
                // or require full browser capabilities, but it's a good first pass for reachability.
                resultParagraph.textContent += 'Success (Reachable)';
                resultParagraph.style.color = 'green';
            } catch (error) {
                // This typically catches network errors (DNS failure, server down, CORS preventing even an opaque response)
                console.error('Error fetching URL:', url, error);
                resultParagraph.textContent += 'Fail (Not Reachable/Error)';
                resultParagraph.style.color = 'red';
            }
        } else {
            // Optionally handle empty URL fields, or just ignore them
            // resultParagraph.textContent = \`URL \${i}: Not provided\`;
            // resultsDiv.appendChild(resultParagraph);
        }
    }
}
