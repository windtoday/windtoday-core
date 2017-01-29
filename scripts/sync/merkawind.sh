#!/bin/bash

export NODE_ENV=production

# merkawind
(node bin/sync --provider=merkawind --seller=particular --path=sails)
(node bin/sync --provider=merkawind --seller=particular --path=boards)
