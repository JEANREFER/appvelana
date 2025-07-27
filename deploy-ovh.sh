#!/bin/bash
npm install
npm run build
npm run export
rm -rf www
mkdir www
cp -R out/* www/
echo "✅ Prêt à déployer via FTP !"