#!/bin/bash

export NODE_ENV=production

# merkawind
(node bin/reindex --provider=merkawind --seller=particular --path=sails)
(node bin/reindex --provider=merkawind --seller=particular --path=boards --no-checkHosts)
