## MMM-Insults

Not meant to compete with the default compliments module. It more about the transition.

## Piss off your wife or girlfriend or anyone you like (or dislike)

1. Use her name (or his name) and count the seconds until you are single again!

2. Use your own name for some self-deprecating humor.

## Why would you use this module?

* As a motivation tool.
* You want a divorce.
* I begged you. **:^)**

## Examples

![](images/1.png)

## Installation and requirements

* `git clone https://github.com/mykle1/MMM-Insults` into the `~/MagicMirror/modules` directory.

* `cd MMM-Insults` and run `npm install`

## Config.js entry and options
```
{
    disabled: false,
    module: "MMM-Insults",
    position: "middle_center",
    config: {
        static: "Mykle is ", // My wife is, My husband is, My girlfriend is, (You get the idea)
        newInsult: 60 * 1000, // Time until the next insult (in ms)
    }
},
```

## IMPORTANT! YOUR ATTENTION PLEASE!

* All modifications, additions, deletions to the insults are done in the "insults.json" file

* Simply follow the existing format of the json file

## Accolades

@sdetweil for his patience and generosity and amusing commentary while finding my errors.
