cd ssl
rm -rf generate-trusted-ssl-certificate

git clone https://github.com/RubenVermeulen/generate-trusted-ssl-certificate.git
cd generate-trusted-ssl-certificate
bash generate.sh
cp server.crt ..
cp server.key ..
cd ..
rm -rf generate-trusted-ssl-certificate