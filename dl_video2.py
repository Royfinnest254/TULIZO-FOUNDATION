import urllib.request, os, ssl

url = 'https://scontent-bos5-1.cdninstagram.com/o1/v/t2/f2/m86/AQMHDuPPNFTTaRzFGqY8ezms3meIrVw8aIfEOPDeE75u683FvB-enPl6WNc-8rI4SxL3lNn__L0cWeyoa-wUAmUyPFas2MXfmLtmyAc.mp4?_nc_cat=105&_nc_sid=5e9851&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_ohc=uhugBxZa8vUQ7kNvwHen8R5&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MjA4NTUwODIzOTUxMzMzOCwiYXNzZXRfYWdlX2RheXMiOjQ5LCJ2aV91c2VjYXNlX2lkIjoxMDA5OSwiZHVyYXRpb25fcyI6OTcsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=558d5abefb341502&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xRDQ0NDJDOTBDMUJCNzBFMzM4NTI3QkM1OUIzOEE5Q192aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzRFNEI4NTEwRDI4REZCNzhEOENEQzUzNjRERkI4MDlCX2F1ZGlvX2Rhc2hpbml0Lm1wNBUCAsgBEgAoABgAGwKIB3VzZV9vaWwBMRJwcm9ncmVzc2l2ZV9yZWNpcGUBMRUAACb029acx7C0BxUCKAJDMywXQFhR64UeuFIYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HZeadAQA&_nc_gid=il4n_SlNbf7-puZwzd8Rew&_nc_ss=72a8c&_nc_zt=28&oh=00_AQC7XvTyr7C92LbC7VSTNf-voPx0zNvvbmzxXwzkc88LWQ&oe=6A47F32A'
out = r'C:\Users\roych\Downloads\Tulizo foundation\media\12_DYRfwdSum1V_intro.mp4'

headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'identity',
    'Referer': 'https://www.instagram.com/',
    'Connection': 'keep-alive',
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(url, headers=headers)
print('Connecting...')
with urllib.request.urlopen(req, timeout=180, context=ctx) as resp:
    total = resp.headers.get('Content-Length', '?')
    print(f'Content-Length: {total} bytes')
    data = resp.read()
    print(f'Read {len(data)} bytes')
    with open(out, 'wb') as f:
        f.write(data)

size = os.path.getsize(out)
print(f'Saved: {round(size/1024/1024,2)} MB -> {out}')
