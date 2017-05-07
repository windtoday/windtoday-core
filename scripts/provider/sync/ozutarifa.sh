#!/bin/bash

export NODE_ENV=production

# ozutarifa
(node bin/provider/sync --provider=ozutarifa --seller=particular --path=sails)
(node bin/provider/sync --provider=ozutarifa --seller=particular --path=boards --no-checkHosts)

(node bin/provider/sync --provider=ozutarifa --seller=outlet --path=sails --no-checkHosts)
(node bin/provider/sync --provider=ozutarifa --seller=outlet --path=boards --no-checkHosts)

(node bin/provider/sync --provider=ozutarifa --seller=store --path=sails --no-checkHosts)
(node bin/provider/sync --provider=ozutarifa --seller=store --path=boards --no-checkHosts)
(node bin/provider/sync --provider=ozutarifa --seller=store --path=masts --no-checkHosts)
(node bin/provider/sync --provider=ozutarifa --seller=store --path=fins --no-checkHosts)
(node bin/provider/sync --provider=ozutarifa --seller=store --path=booms --no-checkHosts)
