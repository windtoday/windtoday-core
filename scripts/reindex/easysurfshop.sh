#!/bin/bash

export NODE_ENV=production

# easysurfshop
(node bin/reindex --provider=easysurfshop --seller=new --path=sails)
(node bin/reindex --provider=easysurfshop --seller=used --path=sails --no-checkHosts)

(node bin/reindex --provider=easysurfshop --seller=new --path=boards --no-checkHosts)
(node bin/reindex --provider=easysurfshop --seller=used --path=boards --no-checkHosts)

(node bin/reindex --provider=easysurfshop --seller=new --path=booms --no-checkHosts)
(node bin/reindex --provider=easysurfshop --seller=used --path=booms --no-checkHosts)

(node bin/reindex --provider=easysurfshop --seller=new --path=masts --no-checkHosts)
(node bin/reindex --provider=easysurfshop --seller=used --path=masts --no-checkHosts)
