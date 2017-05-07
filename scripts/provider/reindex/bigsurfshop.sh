#!/bin/bash

export NODE_ENV=production

# bigsurfshop
(node bin/provider/reindex --provider=bigsurfshop --seller=used --path=sails)

(node bin/provider/reindex --provider=bigsurfshop --seller=used --path=boards --no-checkHosts)

(node bin/provider/reindex --provider=bigsurfshop --seller=used --path=masts --no-checkHosts)

(node bin/provider/reindex --provider=bigsurfshop --seller=used --path=booms --no-checkHosts)

(node bin/provider/reindex --provider=bigsurfshop --seller=used --path=fins --no-checkHosts)
