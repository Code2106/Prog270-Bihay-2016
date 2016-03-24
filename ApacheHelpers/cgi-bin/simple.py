#!/usr/bin/env python3

import cgi
import cgitb
cgitb.enable()  # debug

print("Content-type: text/html;charset=utf-8")
print()

print("""
<html>

<head><title>Prog270 CGI Script</title></head>

<body>

  <h1> This is the Header </h1>

</body>

</html>
""")
