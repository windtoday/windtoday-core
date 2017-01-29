#!/bin/bash

export NODE_ENV=production

# totalwind
(node bin/sync --provider=totalwind --seller=particular --path=sails)
(node bin/sync --provider=totalwind --seller=particular --path=boards)
(node bin/sync --provider=totalwind --seller=particular --path=masts)
(node bin/sync --provider=totalwind --seller=particular --path=fins)
(node bin/sync --provider=totalwind --seller=particular --path=booms)
(node bin/sync --provider=totalwind --seller=particular --path=accesories)
(node bin/sync --provider=totalwind --seller=particular --path=packs)
