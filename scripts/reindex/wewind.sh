#!/bin/bash

export NODE_ENV=production

# wewind
(node bin/reindex --provider=wewind --seller=new --path=sails)
(node bin/reindex --provider=wewind --seller=new --path=boards --no-checkHosts)
(node bin/reindex --provider=wewind --seller=new --path=masts --no-checkHosts)
(node bin/reindex --provider=wewind --seller=new --path=booms --no-checkHosts)
