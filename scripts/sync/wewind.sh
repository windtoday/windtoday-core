#!/bin/bash

export NODE_ENV=production

# wewind
(node bin/sync --provider=wewind --seller=new --path=sails)

(node bin/sync --provider=wewind --seller=new --path=boards --no-checkHosts)

(node bin/sync --provider=wewind --seller=new --path=masts --no-checkHosts)

(node bin/sync --provider=wewind --seller=new --path=booms --no-checkHosts)
