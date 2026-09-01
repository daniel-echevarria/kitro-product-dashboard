# Working agreements

This repository is a take-home assignment, built solo. It nonetheless follows a
team workflow, because how the work is structured is part of what is being
demonstrated.

## Branching

`main` is always deployable. No direct commits to `main` — every change arrives
through a pull request.

One branch per shippable slice, roughly one per user story group. Branch names use
a `type/short-description` form:

```
feat/products-api        a user-facing capability
fix/pagination-count     a bug fix
chore/frontend-scaffold  tooling, dependencies, setup
docs/readme              documentation only
refactor/session-dep     behaviour-preserving change
```

Branch from an up-to-date `main`:

```bash
git switch main && git pull
git switch -c feat/products-api
```

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`
in the imperative mood, lowercase, no trailing period.

```
feat(api): add search and sort to products endpoint
fix(api): apply search filter to pagination count query
chore(deps): add sqlmodel and psycopg
docs: document gains-after-tax assumption
test(api): cover pagination boundaries
```

Commit at each point where the code works and does one comprehensible thing —
not at the end of a session, and not after every keystroke. A good test: the
summary line describes the change without needing the word "and".

## Pull requests

Every branch merges via PR, self-reviewed and self-merged. The PR is a record of
reasoning, not a gate — there is nobody to wait for, so nothing waits.

The description states what changed, which user stories it covers, and any
trade-off or assumption worth surfacing. Assumptions matter most: the brief
leaves several things undefined, and the reasoning is more interesting than the
choice.

```bash
gh pr create --fill                      # then edit the body with context
gh pr merge --squash --delete-branch
git switch main && git pull
```

Squash merge, so `main` reads as one commit per slice while the PR page retains
the individual commits.

## Definition of done

A slice is done when the code runs, the behaviour matches the user story, the
assumptions are written down, and it is merged to `main`.
