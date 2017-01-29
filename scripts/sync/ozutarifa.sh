#!/bin/bash

export NODE_ENV=production

# ozutarifa
(node bin/sync --provider=ozutarifa --seller=particular --path=sails)
(node bin/sync --provider=ozutarifa --seller=particular --path=boards)

(node bin/sync --provider=ozutarifa --seller=outlet --path=sails)
(node bin/sync --provider=ozutarifa --seller=outlet --path=boards)

(node bin/sync --provider=ozutarifa --seller=store --path=sails)
(node bin/sync --provider=ozutarifa --seller=store --path=boards)
(node bin/sync --provider=ozutarifa --seller=store --path=masts)
(node bin/sync --provider=ozutarifa --seller=store --path=fins)
(node bin/sync --provider=ozutarifa --seller=store --path=booms)
