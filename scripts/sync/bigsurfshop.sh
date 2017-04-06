#!/bin/bash

export NODE_ENV=production

# bigsurfshop
(node bin/sync --provider=bigsurfshop --seller=used --path=sails)

(node bin/sync --provider=bigsurfshop --seller=used --path=boards --no-checkHosts)

(node bin/sync --provider=bigsurfshop --seller=used --path=masts --no-checkHosts)

(node bin/sync --provider=bigsurfshop --seller=used --path=booms --no-checkHosts)

(node bin/sync --provider=bigsurfshop --seller=used --path=fins --no-checkHosts)
