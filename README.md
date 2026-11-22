# usage-limits

A Claude Code mod that shows your context usage and usage limits in the terminal status line, for example:

`Context 45k/200k (22%) · 5h 23% reset at 14:30 · week 41%`

It shows the tokens used against the model's context window, your 5-hour session usage with the local time it resets, and your weekly usage. It updates after each response.

## Install

At the prompt of a terminal session:

```
/plugin install usage-limits --marketplace plxmm/usage-limits
```

From a shell:

```
claude plugin install usage-limits --marketplace plxmm/usage-limits
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `plxmm/usage-limits`, then Add plugin.
