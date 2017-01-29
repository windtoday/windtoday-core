#!/bin/bash

export NODE_ENV=production

# totalwind
(node bin/reindex --provider=totalwind --seller=particular --path=sails)
(node bin/reindex --provider=totalwind --seller=particular --path=boards)
(node bin/reindex --provider=totalwind --seller=particular --path=masts)
(node bin/reindex --provider=totalwind --seller=particular --path=fins)
(node bin/reindex --provider=totalwind --seller=particular --path=booms)
(node bin/reindex --provider=totalwind --seller=particular --path=accesories)
(node bin/reindex --provider=totalwind --seller=particular --path=packs)

# merkawind
(node bin/reindex --provider=merkawind --seller=particular --path=sails)
(node bin/reindex --provider=merkawind --seller=particular --path=boards)

# ozutarifa
(node bin/reindex --provider=ozutarifa --seller=particular --path=sails)
(node bin/reindex --provider=ozutarifa --seller=particular --path=boards)

(node bin/reindex --provider=ozutarifa --seller=outlet --path=sails)
(node bin/reindex --provider=ozutarifa --seller=outlet --path=boards)

(node bin/reindex --provider=ozutarifa --seller=store --path=sails)
(node bin/reindex --provider=ozutarifa --seller=store --path=boards)
(node bin/reindex --provider=ozutarifa --seller=store --path=masts)
(node bin/reindex --provider=ozutarifa --seller=store --path=fins)
(node bin/reindex --provider=ozutarifa --seller=store --path=booms)
