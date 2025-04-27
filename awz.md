# AWS


<details>
<summary>EC2 setup</summary>

EC 2 User Data Bash script <br/>

<pre><code class="language-bash">#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd

echo "<h1> Hello, World from $(hostname -f) </h1>" > /var/www/html/index.html
</code></pre>

</details>































<script type="module">
    import * as mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.min.js';
    mermaid.initialize({
        startOnLoad: true,
        theme: 'dark'
    });
</script>
