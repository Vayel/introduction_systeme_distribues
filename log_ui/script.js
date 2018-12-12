var MASTER = "master", SLAVES = "slaves";
var LABELS = {
    IN: "»",
    OUT: "«",
    WORKING: "...",
    ERROR: "!",
};
var TEXT_TO_EMOJI = {
    "pomme": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2LjY3MyA1Ni42NzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2LjY3MyA1Ni42NzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRDEzODM0OyIgZD0iTTMxLjQ4MywxNi4yMTNjLTIuMDY1LDAuNTExLTQuMjI3LDAuNTExLTYuMjkyLDBjLTEwLjc1Ni0yLjY2LTE5Ljc2Mi0xLjY0LTE5LjY1OCwxOC42NDMgICBjMC4wNTMsMTAuMzksOS43ODMsMjMuODYyLDIwLjAwOSwyMS41NTdjMS44MzQtMC40MTMsMy43NTUtMC40MTMsNS41ODksMGMxMC4yMjYsMi4zMDUsMTkuOTU2LTExLjE2NywyMC4wMDktMjEuNTU3ICAgQzUxLjI0NCwxNC41NzQsNDIuMjM5LDEzLjU1MywzMS40ODMsMTYuMjEzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0Y3NUI1NzsiIGQ9Ik0xMC41MzMsMjkuNjc0Yy0wLjU1MywwLTEtMC40NDgtMS0xYzAtNS41MTQsNC4wMzctMTAsOS0xMGMwLjU1MywwLDEsMC40NDgsMSwxcy0wLjQ0NywxLTEsMSAgIGMtMy44NTksMC03LDMuNTg5LTcsOEMxMS41MzMsMjkuMjI2LDExLjA4NSwyOS42NzQsMTAuNTMzLDI5LjY3NHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM0QzMxMkM7IiBkPSJNMjguMjY1LDE5Ljk5OWMtMC41MzcsMC0wLjk4MS0wLjQyNy0wLjk5OC0wLjk2OGMtMC4xMzUtNC4yMzItMS43NjEtOS41NDUtNS45MjItMTEuNzY0ICAgYy0wLjQ4Ny0wLjI2LTAuNjcyLTAuODY1LTAuNDEyLTEuMzUzYzAuMjYxLTAuNDg3LDAuODY0LTAuNjcyLDEuMzU0LTAuNDEyYzQuOTE0LDIuNjIsNi44MjcsOC42NzMsNi45NzksMTMuNDY1ICAgYzAuMDE4LDAuNTUyLTAuNDE1LDEuMDE0LTAuOTY4LDEuMDMxQzI4LjI4NiwxOS45OTksMjguMjc2LDE5Ljk5OSwyOC4yNjUsMTkuOTk5eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izk5NDUzMDsiIGQ9Ik0yOC4xNzYsMjMuNTkyYy0xLjY4LDAtMy4yNjEtMC42NTUtNC40NS0xLjg0NWMtMC4zOTEtMC4zOS0wLjM5MS0xLjAyMywwLTEuNDE0ICAgczEuMDIzLTAuMzkxLDEuNDE0LDBjMC44MTIsMC44MTIsMS44OTEsMS4yNTksMy4wMzYsMS4yNTlzMi4yMjQtMC40NDcsMy4wMzUtMS4yNTljMC4zOTEtMC4zOTEsMS4wMjMtMC4zOTEsMS40MTQsMCAgIGMwLjM5MSwwLjM5LDAuMzkxLDEuMDIzLDAsMS40MTRDMzEuNDM2LDIyLjkzNywyOS44NTYsMjMuNTkyLDI4LjE3NiwyMy41OTJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojNjU5QzM1OyIgZD0iTTI3LjMwNSwxMy4wNGwwLjYwOS00LjA4NmMwLjY0My00LjMxNSw0LjAzMS03LjcwMyw4LjM0Ni04LjM0Nkw0MC4zNDUsMGwtMC42MDksNC4wODYgICBjLTAuNjQzLDQuMzE1LTQuMDMxLDcuNzAzLTguMzQ2LDguMzQ2TDI3LjMwNSwxMy4wNHoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
    "poire": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4LjEzNyA1OC4xMzciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU4LjEzNyA1OC4xMzc7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojNjU5QzM1OyIgZD0iTTI4Ljc4Miw4LjkwNmMtMC40NzMsMC0wLjg5My0wLjMzNi0wLjk4Mi0wLjgxN2MtMC41NTYtMi45OTYtMS45MDEtNS40MjctMy40MjgtNi4xOTQgICBjLTAuNDk0LTAuMjQ4LTAuNjkzLTAuODQ5LTAuNDQ1LTEuMzQyYzAuMjQ4LTAuNDk0LDAuODQ4LTAuNjkzLDEuMzQyLTAuNDQ1YzMuMTU2LDEuNTg1LDQuMjQsNi4yMyw0LjQ5Nyw3LjYxNyAgIGMwLjEwMSwwLjU0My0wLjI1OCwxLjA2NC0wLjgwMSwxLjE2NkMyOC45MDMsOC45LDI4Ljg0Miw4LjkwNiwyOC43ODIsOC45MDZ6Ii8+Cgk8cGF0aCBkPSJNMjguNzE0LDExLjU4M2MtMC45MjgsMC0xLjgyNC0wLjMzMS0yLjQ5NS0xLjAwMmMtMC4zOTEtMC4zOTEtMC4zOTEtMS4wMjMsMC0xLjQxNHMxLjAyMy0wLjM5MSwxLjQxNCwwICAgYzAuMzAyLDAuMzAyLDAuNzI4LDAuNDQ5LDEuMjE3LDAuNDE2YzAuNTM2LTAuMDM4LDEuMDYxLTAuMjg5LDEuNDc5LTAuNzA3YzAuMzkxLTAuMzkxLDEuMDIzLTAuMzkxLDEuNDE0LDBzMC4zOTEsMS4wMjMsMCwxLjQxNCAgIEMzMC44ODYsMTEuMTQ3LDI5Ljc3OSwxMS41ODMsMjguNzE0LDExLjU4M3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNEN0NDNTY7IiBkPSJNMjkuMTAyLDUuNjA4YzIuMjM4LTAuMDI1LDQuNDQyLDEuMTczLDUuNTQ3LDMuMjY0YzAuOTQyLDEuNzg0LDEuMzk2LDMuOTQ0LDEuOTkzLDUuODU1ICAgYzAuODQzLDIuNjk5LDEuNDU3LDUuNDc1LDIuMzE2LDguMTYyYzAuODg5LDIuNzgyLDIuNTE1LDUuMzkyLDMuOTA0LDcuOTQ2YzEuMjA1LDIuMjE3LDIuNzI0LDQuNDM5LDMuNTAzLDYuODQ4ICAgYzEuMDEzLDMuMTM0LDAuODQ3LDYuNjA2LTAuMjcyLDkuNjljLTIuMDY3LDUuNy03LjMyMyw5LjQ1Ny0xMy4xOTUsMTAuNDU3Yy0xLjI0NywwLjIxMi0yLjUyMSwwLjMxMi0zLjc5NiwwLjMwNWgtMC4wNjYgICBjLTEuMjc1LDAuMDA2LTIuNTQ5LTAuMDkzLTMuNzk2LTAuMzA1Yy01Ljg3MS0xLTExLjEyNy00Ljc1Ni0xMy4xOTUtMTAuNDU3Yy0xLjExOS0zLjA4NS0xLjI4NS02LjU1Ni0wLjI3Mi05LjY5ICAgYzAuNzc5LTIuNDA5LDIuMjk3LTQuNjMsMy41MDMtNi44NDhjMS4zODktMi41NTUsMy4wMTUtNS4xNjQsMy45MDQtNy45NDZjMC44NTktMi42ODgsMS40NzMtNS40NjQsMi4zMTYtOC4xNjIgICBjMC41OTctMS45MTIsMS4wNTEtNC4wNzIsMS45OTMtNS44NTVjMS4xMDUtMi4wOTEsMy4zMDktMy4yOSw1LjU0Ny0zLjI2NCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0UzRTgyQTsiIGQ9Ik0yMy45NjcsNTIuNTg4Yy0wLjA3NiwwLTAuMTUzLTAuMDA4LTAuMjMtMC4wMjdjLTMuMDA2LTAuNzA4LTUuNDA1LTIuNjUtNi41ODMtNS4zMzEgICBjLTAuMjIyLTAuNTA2LDAuMDA4LTEuMDk2LDAuNTEzLTEuMzE4YzAuNTA3LTAuMjIxLDEuMDk2LDAuMDA4LDEuMzE4LDAuNTEzYzAuOTIyLDIuMSwyLjgyMSwzLjYyNiw1LjIwOSw0LjE4OSAgIGMwLjUzOCwwLjEyNiwwLjg3MSwwLjY2NSwwLjc0NCwxLjIwMkMyNC44MzEsNTIuMjc4LDI0LjQyLDUyLjU4OCwyMy45NjcsNTIuNTg4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0UzRTgyQTsiIGQ9Ik0xNy4yNjUsNDIuMzA4Yy0wLjAyNywwLTAuMDU0LTAuMDAxLTAuMDgyLTAuMDAzYy0wLjU1LTAuMDQ0LTAuOTYtMC41MjYtMC45MTYtMS4wNzcgICBjMC4wODQtMS4wNDEsMC4yNi0yLjA5NywwLjUyMy0zLjE0MWMwLjEzNi0wLjUzNiwwLjY4LTAuODU3LDEuMjE1LTAuNzI1YzAuNTM1LDAuMTM1LDAuODYsMC42NzksMC43MjUsMS4yMTUgICBjLTAuMjM2LDAuOTM2LTAuMzk1LDEuODgxLTAuNDcsMi44MTJDMTguMjE5LDQxLjkxMiwxNy43ODEsNDIuMzA4LDE3LjI2NSw0Mi4zMDh6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
    "banane": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU0LjM1NCA1NC4zNTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU0LjM1NCA1NC4zNTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRjlFMjgwOyIgZD0iTTUxLjE2OSw4Ljk1OWMtMC4xNTQtMC4yOTEtMC4zMDYtMC41ODMtMC40NzQtMC44N2MtMC42MTktMS4wNTYtMS4zMzUtMi4wMjMtMi4xMDUtMi45MzkgICAgYzIuMTMyLDguODY5LTEuNTYyLDE4LjE4Mi03LjA2LDI0LjI1OWMtMTEuMTAzLDEyLjI3My0yMS42NDYsMTYuNDQtMjkuMDUzLDE3LjE0OGMtMS43NjYsMC43MjItMy41NywxLjI5OS01LjUyNywxLjc0OSAgICBjLTAuMDg4LDAuMDItMC4xNywwLjAyNi0wLjI1NSwwLjA0YzEuMDAxLDAuMTUzLDIuMjIxLDAuMjcsMy42NTIsMC4yN2M3LjA3MiwwLDE5LjA1Ny0yLjgyMSwzMi42NjYtMTcuODY1ICAgIEM0OC4wMjYsMjUuMjA5LDUxLjYyOCwxNy4xMzksNTEuMTY5LDguOTU5eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGOUUyODA7IiBkPSJNMy43MjgsNDcuNDJsLTAuMDc1LDAuMTkxYzAuMDY3LDAuMDI2LDAuMjc5LDAuMTA1LDAuNjE4LDAuMjA3ICAgIEM0LjA3OCw0Ny42OTYsMy44OTksNDcuNTYsMy43MjgsNDcuNDJ6Ii8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRjlENzBCOyIgZD0iTTYuOTQ5LDQ4LjMwNmMwLjQ5My0wLjExNCwwLjk3Ny0wLjIzNSwxLjQ1My0wLjM2NUM3LjkyNiw0OC4wNzEsNy40NDIsNDguMTkzLDYuOTQ5LDQ4LjMwNnoiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRThDNTJFOyIgZD0iTTQ4LjQxMSw0LjkyNUw0NS4zMjQsMEw0My4xMywxLjQ0NmwyLjYyMyw1LjAzOWMwLjIyMiwwLjcsMC41MzgsMS40NDEsMC41NDIsMi4xMTUgICAgYzAuMDY3LDEwLjU0Mi04LjQzNiwyMS41MS0yMC42NzQsMzAuMTY0Yy01LjAzOCwzLjU2My04LjkwMiw2LjAzNS0xMi45NTUsNy43MThjLTAuMDY0LDAuMDI2LTAuMTI4LDAuMDQ5LTAuMTkyLDAuMDc1ICAgIGMwLjAwMSwwLDAuMDAyLTAuMDAxLDAuMDAyLTAuMDAxYzcuNDA3LTAuNzA4LDE3Ljk1LTQuODc2LDI5LjA1My0xNy4xNDhjNS40OTctNi4wNzYsOS4xOTEtMTUuMzg3LDcuMDYxLTI0LjI1NSAgICBDNDguNTI5LDUuMDgsNDguNDc0LDQuOTk4LDQ4LjQxMSw0LjkyNXoiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRjlENzBCOyIgZD0iTTkuNjM0LDQ3LjU3OGMwLjA1MS0wLjAxNiwwLjEwNC0wLjAzLDAuMTU1LTAuMDQ2QzkuNzM4LDQ3LjU0OCw5LjY4NSw0Ny41NjIsOS42MzQsNDcuNTc4eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGOUQ3MEI7IiBkPSJNNTEuMTMxLDguODljMC4wMTIsMC4wMjMsMC4wMjUsMC4wNDUsMC4wMzcsMC4wNjhjMC40Niw4LjE4LTMuMTQyLDE2LjI1LTguMTU2LDIxLjc5MiAgICBDMjkuNDAzLDQ1Ljc5NSwxNy40MTgsNDguNjE2LDEwLjM0Niw0OC42MTZjLTEuNDMxLDAtMi42NTEtMC4xMTctMy42NTItMC4yN2MwLjA4NS0wLjAxMywwLjE2Ny0wLjAxOSwwLjI1NS0wLjA0ICAgIGMtMS4wNzgsMC4yNDgtMS45NTktMC4wMzUtMi42NzctMC40ODhjLTAuMzM5LTAuMTAyLTAuNTUxLTAuMTgxLTAuNjE4LTAuMjA3bDAuMDc1LTAuMTkxYy0wLjg5My0wLjczMy0xLjQ4LTEuNjExLTEuODUtMS42MjEgICAgYy0wLjcyLTAuMDItMS4yLDEuNDc4LTEuMjU0LDIuNTM2YzguNjUzLDkuMTYsMjEuNzIyLDcuMDc2LDM1LjQyNS0wLjk1MkM1MS4yMTIsMzguNDk5LDU3LjgwNiwyMS40NTIsNTEuMTMxLDguODlMNTEuMTMxLDguODl6Ii8+Cgk8L2c+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQjU4QzMwOyIgZD0iTTQ3LjMxMyw4LjI3MmwxLjU5OS0wLjM4NGMwLjcwMy0wLjE2OSwxLjAwOS0xLjAwMSwwLjU4NC0xLjU4NyAgIGMtMC4zMzItMC40NTgtMC42OC0wLjkwMi0xLjA0NS0xLjMyOUM0OC40MjUsNC45NCw0OC40LDQuOTA3LDQ4LjM3OCw0Ljg3MmwtMi41MDQtMy45OTRjLTAuMzAyLTAuNDgxLTAuOTQtMC42Mi0xLjQxNC0wLjMwNyAgIGwtMC41NjcsMC4zNzRjLTAuNDMzLDAuMjg1LTAuNTgsMC44NTItMC4zNDEsMS4zMTJsMi4xNjQsNC4xNThjMC4wMjUsMC4wNDgsMC4wNDUsMC4wOTcsMC4wNjIsMC4xNDkgICBjMC4xMDksMC4zMzUsMC4yMzMsMC42NzcsMC4zMzMsMS4wMTdDNDYuMjYxLDguMDk0LDQ2Ljc5MSw4LjM5Nyw0Ny4zMTMsOC4yNzJ6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
    "cerise": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU3LjYxNCA1Ny42MTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU3LjYxNCA1Ny42MTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRDEzODM0OyIgZD0iTTIuODA3LDM3LjYxNGMwLTcuNzM4LDUuMzY3LTE0LDEyLTE0aDJjNi42MzMsMCwxMiw2LjI2MiwxMiwxNGMwLDcuMTgtNS44MiwxMy0xMywxMyAgIFMyLjgwNyw0NC43OTMsMi44MDcsMzcuNjE0eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0VEM0YzMjsiIGQ9Ik0xMy43NjQsNDcuMzg2Yy0wLjA3MiwwLTAuMTQ2LTAuMDA4LTAuMjE5LTAuMDI0Yy0zLjU1Ni0wLjc5Ni02LjQ0OC0zLjM5NS03LjU0OC02Ljc4NCAgIGMtMC4xNy0wLjUyNSwwLjExNy0xLjA4OSwwLjY0My0xLjI2YzAuNTI3LTAuMTY5LDEuMDksMC4xMTcsMS4yNiwwLjY0M2MwLjg2OSwyLjY3OCwzLjI1Nyw0LjgxNyw2LjA4Miw1LjQ0OSAgIGMwLjUzOSwwLjEyMSwwLjg3OCwwLjY1NSwwLjc1OCwxLjE5NEMxNC42MzQsNDcuMDY5LDE0LjIyMiw0Ny4zODYsMTMuNzY0LDQ3LjM4NnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFRDNGMzI7IiBkPSJNNi43MzUsMzYuMjEyYy0wLjA2NSwwLTAuMTMyLTAuMDA2LTAuMTk5LTAuMDJjLTAuNTQxLTAuMTA5LTAuODkyLTAuNjM3LTAuNzgzLTEuMTc4ICAgYzAuMjczLTEuMzU0LDAuNzctMi42MjcsMS40NzYtMy43ODVjMC4yODgtMC40NzEsMC45MDQtMC42MTksMS4zNzUtMC4zMzNjMC40NzEsMC4yODgsMC42MiwwLjkwMywwLjMzMywxLjM3NSAgIGMtMC41ODQsMC45NTgtMC45OTYsMi4wMTQtMS4yMjIsMy4xMzlDNy42MTksMzUuODg0LDcuMjAxLDM2LjIxMiw2LjczNSwzNi4yMTJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRUQzRjMyOyIgZD0iTTI4LjgwNyw0NC42MTRjMC03LjczOCw1LjM2Ny0xNCwxMi0xNGgyYzYuNjMzLDAsMTIsNi4yNjIsMTIsMTRjMCw3LjE4LTUuODIsMTMtMTMsMTMgICBTMjguODA3LDUxLjc5MywyOC44MDcsNDQuNjE0eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0VEM0YzMjsiIGQ9Ik0yMy44MDcsMzMuNjE0Yy0zLjMwOSwwLTYtMi42OTEtNi02YzAtMC41NTIsMC40NDgtMSwxLTFzMSwwLjQ0OCwxLDFjMCwyLjIwNiwxLjc5NCw0LDQsNCAgIGMwLjU1MiwwLDEsMC40NDgsMSwxUzI0LjM1OSwzMy42MTQsMjMuODA3LDMzLjYxNHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFRDcxNjE7IiBkPSJNNDcuODA3LDQwLjYxNGMtMy4zMDksMC02LTIuNjkxLTYtNmMwLTAuNTUyLDAuNDQ4LTEsMS0xczEsMC40NDgsMSwxYzAsMi4yMDYsMS43OTQsNCw0LDQgICBjMC41NTIsMCwxLDAuNDQ4LDEsMVM0OC4zNTksNDAuNjE0LDQ3LjgwNyw0MC42MTR6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojNEMzMTJDOyIgZD0iTTQ1LjgwNiwzNi42MTRjLTAuMTY0LDAtMC4zMzEtMC4wNDEtMC40ODUtMC4xMjZjLTAuNDgyLTAuMjY4LTAuNjU3LTAuODc3LTAuMzg4LTEuMzYgICBjNC4yMjgtNy42MSwzLjUzOC0xNC4wMTctMi45NTgtMjQuNDYxYy0xLjU4MywxMS4wMTMtMTEuNDIsMTkuOTE5LTE5LjU5NiwxOS45MTljLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTEgICBjNy44NTMsMCwxNy44MTYtOS44NzUsMTcuODE2LTIwLjk3MmMwLTAuNDQsMC4yODktMC44MywwLjcxLTAuOTU3YzAuNDIxLTAuMTI4LDAuODc3LDAuMDM2LDEuMTIyLDAuNDAyICAgYzcuMTgxLDEwLjc3MiwxMC4yNDUsMTguOTc3LDQuNjU0LDI5LjA0MUM0Ni40OTgsMzYuNDI4LDQ2LjE1NywzNi42MTQsNDUuODA2LDM2LjYxNHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4OEMwNTc7IiBkPSJNNDAuODA3LDcuMDkyYzQuMDEyLDIuOTQxLDEwLjE0OCwxLjM4LDEzLjA4OS0yLjYzMkM0OS44ODQsMS41MTgsNDMuNzQ4LDMuMDgsNDAuODA3LDcuMDkyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzY1OUMzNTsiIGQ9Ik0yOS44MDcsMC4xMWMwLjc1Nyw0LjkxNyw2LjIsOC4xNTEsMTEuMTE3LDcuMzk0QzQwLjE2NiwyLjU4NywzNC43MjMtMC42NDcsMjkuODA3LDAuMTF6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRUQ3MTYxOyIgZD0iTTM5LjYyMyw1NC43MzFjLTAuMDcyLDAtMC4xNDYtMC4wMDgtMC4yMTktMC4wMjRjLTMuNTU2LTAuNzk2LTYuNDQ4LTMuMzk2LTcuNTQ4LTYuNzg1ICAgYy0wLjE3LTAuNTI1LDAuMTE3LTEuMDg5LDAuNjQzLTEuMjZjMC41MjYtMC4xNzEsMS4wOSwwLjExNywxLjI2LDAuNjQzYzAuODY5LDIuNjc4LDMuMjU3LDQuODE3LDYuMDgyLDUuNDUgICBjMC41MzksMC4xMjEsMC44NzgsMC42NTYsMC43NTgsMS4xOTRDNDAuNDkzLDU0LjQxNSw0MC4wOCw1NC43MzEsMzkuNjIzLDU0LjczMXoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
    "pêche": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU0LjY4IDU0LjY4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NC42OCA1NC42ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFNThENTE7IiBkPSJNNDAuODAxLDExLjkyMmMtMS43NzgsMC42NTUtMy43MjEsMC45MDctNS42OTUsMC42N2wtNS4wNy0wLjYwOWwxLjcxMi0zLjg4NCAgIEMzMC4zMiw3LjgyOCwyOC44NDgsNy42OCwyNy4zNCw3LjY4Yy0xMi45NzksMC0yMy41LDEwLjUyMS0yMy41LDIzLjVzMTAuNTIxLDIzLjUsMjMuNSwyMy41czIzLjUtMTAuNTIxLDIzLjUtMjMuNSAgIEM1MC44NCwyMy4yMSw0Ni44NjksMTYuMTcxLDQwLjgwMSwxMS45MjJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkJENDkwOyIgZD0iTTEwLjA2NCwzOC4xMzhjLTAuNDEzLDAtMC43OTktMC4yNTgtMC45NDMtMC42NjljLTEuMzYtMy44NzUtMS40NzktOC4xNTItMC4zMzUtMTIuMDQ0ICAgYzAuMTU2LTAuNTMsMC43MTQtMC44MzMsMS4yNDEtMC42NzhjMC41MywwLjE1NiwwLjgzMywwLjcxMSwwLjY3OCwxLjI0MWMtMS4wMjYsMy40OTQtMC45MTgsNy4zMzYsMC4zMDMsMTAuODE4ICAgYzAuMTgzLDAuNTIxLTAuMDkxLDEuMDkyLTAuNjEyLDEuMjc0QzEwLjI4NiwzOC4xMiwxMC4xNzQsMzguMTM4LDEwLjA2NCwzOC4xMzh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkJENDkwOyIgZD0iTTExLjM4NSwyMi44NTFjLTAuMTY4LDAtMC4zMzktMC4wNDItMC40OTYtMC4xMzJjLTAuNDc5LTAuMjc0LTAuNjQ2LTAuODg1LTAuMzcxLTEuMzY0ICAgYzAuNzQ5LTEuMzEsMS42NTYtMi41MjYsMi42OTctMy42MThjMC4zODEtMC40LDEuMDE1LTAuNDE0LDEuNDE0LTAuMDM0YzAuNCwwLjM4MSwwLjQxNSwxLjAxNCwwLjAzNCwxLjQxNCAgIGMtMC45MjksMC45NzUtMS43MzksMi4wNjItMi40MDksMy4yMzFDMTIuMDY5LDIyLjY3LDExLjczMiwyMi44NTEsMTEuMzg1LDIyLjg1MXoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRTZCMjk7IiBkPSJNMzkuOTY0LDUwLjk5N2MyLjM5Mi0xLjUyNyw0LjQ5Mi0zLjQ3LDYuMTktNS43MzRjMC44MDktMi4yMzIsMS4yNTItNC42MDMsMS4zMjUtNi45MDEgICBjMC4yMjctNy4yMTYtMy4wNjgtMTUuNDY5LTEwLjk0My0xNy42MzlsLTAuMDE3LDAuMDYzYy0wLjAxLTAuMDA1LTAuMDE3LTAuMDE0LTAuMDI4LTAuMDE5Yy0wLjA5Ni0wLjA0MS0yLjM4NS0wLjk5NC02LjQ2OS0xLjA4MSAgIGMtMy41MDgtMC4wNzQtNi41NDctMC41MjUtOC4yMDctNS4zMThjLTAuMTg1LTAuNTM0LTAuNzYzLTAuODE2LTEuMjk1LTAuNjNjLTAuNTI5LDAuMTg4LTAuODA5LDAuNzczLTAuNjIzLDEuMzA4ICAgYzIuMDg2LDYuMDIzLDYuMjk4LDYuNjEzLDEwLjA4Miw2LjY5M2MzLjYzNSwwLjA3Nyw1LjY4LDAuOTAzLDUuNzI2LDAuOTIyYzAuMTI4LDAuMDU0LDAuMjYsMC4wOCwwLjM5MSwwLjA4ICAgYzAuMDAzLDAsMC4wMDYtMC4wMDEsMC4wMDktMC4wMDFjNi43MjcsMS45MjMsOS41NDIsOS4xODIsOS4zNDIsMTUuNTU4QzQ1LjMsNDIuOTY1LDQzLjUzLDQ3Ljk4NiwzOS45NjQsNTAuOTk3eiIvPgoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0E0NkYzRTsiIHBvaW50cz0iMzEuMjQsMTcgMjkuNjQsMTcgMjguODQsMTEgMzIuMDQsMTEgICIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzY1OUMzNTsiIGQ9Ik00OS44NCwwLjY5N2wtNS4wNy0wLjYwOWMtNS4zNTQtMC42NDMtMTAuNDk5LDIuMjg5LTEyLjY3NCw3LjIyM2wtMi4wNiw0LjY3Mmw1LjA3LDAuNjA5ICAgYzUuMzU0LDAuNjQzLDEwLjQ5OS0yLjI4OSwxMi42NzQtNy4yMjNMNDkuODQsMC42OTd6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODhDMDU3OyIgZD0iTTMwLjAzNiwxMS45ODRsMi4yNjYsMC4yNzJsMTAuMDc2LTYuNDEyYzAuNDY2LTAuMjk2LDAuNjAzLTAuOTE1LDAuMzA3LTEuMzgxICAgYy0wLjI5Ni0wLjQ2NS0wLjkxNC0wLjYwNC0xLjM4MS0wLjMwN0wzMC40MzksMTEuMDdMMzAuMDM2LDExLjk4NHoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
    "pastèque": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwLjQ4NCA1MC40ODQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwLjQ4NCA1MC40ODQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODhDMDU3OyIgZD0iTTE4LjQzNywyMy45NTRsMS4zNTksNC41M2MwLjE4MiwxLjE0My0wLjU4MywyLjI1LTEuNjgzLDIuNjFsLTEuMTE5LDAuMzY2bC0wLjMyMSwwLjk5NCAgIGMtMC40MjEsMS4zMDUtMS4zNjUsMi4zMTUtMi42NzMsMi43MjNjLTEuMTU0LDAuMzYtMy42NjctMi4yMzMtNC42OTMtMi4wOTNMMCw0Mi4zOTFjMTEuNzYxLDExLjAxNCwzMC4yMjMsMTAuNzg5LDQxLjcwMS0wLjY4OSAgIFM1My40MDQsMTEuNzYxLDQyLjM5MSwwTDE4LjQzNywyMy45NTR6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRTIyRjM3OyIgZD0iTTM3LjA4Nyw1LjMwM2wtMTguNjUsMTguNjVsMS4zNTksNC41M2MwLjE4MiwxLjE0My0wLjU4MywyLjI1LTEuNjgzLDIuNjFsLTEuMTE5LDAuMzY2ICAgbC0wLjMyMSwwLjk5NGMtMC40MjEsMS4zMDUtMS4zNjUsMi4zMTUtMi42NzMsMi43MjNjLTEuMTU0LDAuMzYtMy42NjctMi4yMzMtNC42OTMtMi4wOTNsLTQuMDA0LDQuMDA0YzAsMC4wMDIsMCwwLjAwMywwLDAuMDA1ICAgYzguNzc0LDkuNTU3LDIyLjQyOSw4LjY3OSwzMS40NDgtMC4zNDFzOS44OTgtMjIuNjc0LDAuMzQxLTMxLjQ0OEMzNy4wOTEsNS4zMDMsMzcuMDg5LDUuMzAzLDM3LjA4Nyw1LjMwM3oiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGN4PSI0LjUiIGN5PSIxNi45ODQiIHI9IjEuNSIvPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMjMxRjIwOyIgY3g9IjE2LjUiIGN5PSIzOC45ODQiIHI9IjEuNSIvPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMjMxRjIwOyIgY3g9IjI1Ljk2OCIgY3k9IjI1LjYxNSIgcj0iMS41Ii8+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiMyMzFGMjA7IiBjeD0iMzAuOTE4IiBjeT0iMjAuNjY1IiByPSIxLjUiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGN4PSIyOC4wOSIgY3k9IjM3LjYzNiIgcj0iMS41Ii8+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiMyMzFGMjA7IiBjeD0iMzMuMDM5IiBjeT0iMzIuNjg2IiByPSIxLjUiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGN4PSIzNy45ODkiIGN5PSIyNy43MzYiIHI9IjEuNSIvPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMjMxRjIwOyIgY3g9IjM1Ljg2OCIgY3k9IjE1LjcxNSIgcj0iMS41Ii8+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiMyMzFGMjA7IiBjeD0iMjIuNDMzIiBjeT0iMzYuMjIxIiByPSIxLjUiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGN4PSIyNy41IiBjeT0iMzAuOTg0IiByPSIxLjUiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGN4PSIzMi41IiBjeT0iMjUuOTg0IiByPSIxLjUiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGN4PSI3LjUiIGN5PSIyNi45ODQiIHI9IjEuNSIvPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMjMxRjIwOyIgY3g9IjEzLjUiIGN5PSIxOC45ODQiIHI9IjEuNSIvPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMjMxRjIwOyIgY3g9IjM3LjI4MiIgY3k9IjIxLjM3MiIgcj0iMS41Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
};

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getEmojiImg(name) {
    return '<img src="' + TEXT_TO_EMOJI[name] + '" alt="' + name + '" class="emoji" />';
}

function replaceByEmoji(text) {
    for (var name in TEXT_TO_EMOJI) {
        text = text.replace(new RegExp(name, "g"), getEmojiImg(name));
    }
    return text;
}

function addMessage(msg, container) {
    var date = new Date(msg.timestamp);
    var html = "" + pad(date.getMinutes(), 2) + ":" + pad(date.getSeconds(), 2) + " - ";
    if (msg.type == SLAVES) {
        html += "(" + msg.agent + ") - ";
    }
    html += "(" + msg.task + ") : " + replaceByEmoji(msg.text);

    var wrapper = document.createElement("div");
    wrapper.dataset.task = msg.task;
    wrapper.className = "message " + msg.type;

    var text = document.createElement("div");
    text.innerHTML = html;
    text.className = "text";

    var label = document.createElement("div");
    label.className = "label";
    label.innerHTML = msg.label;

    wrapper.appendChild(label);
    wrapper.appendChild(text);
    container.appendChild(wrapper);

    wrapper.addEventListener("mouseover", function() {
        for (var wrapper of document.querySelectorAll(".message[data-task='" + msg.task + "']")) {
            wrapper.className = wrapper.className + " active";
        }
    });

    wrapper.addEventListener("mouseout", function() {
        var classes, index;
        for (var wrapper of document.querySelectorAll(".message.active")) {
            classes = wrapper.className.split(" ");
            index = classes.indexOf("active");
            if (index != -1) {
                classes.splice(index, 1);
            }
            wrapper.className = classes.join(" ");
        }
    });
}

function parseMsg(text, type) {
    // [timestamp][agent][task][label]text
    var rgTimestamp = "\\[([0-9\\.]+)\\]",
        rgAgent = "\\[([\\w-]+)\\]",
        rgTask = "\\[([\\w-]+)\\]",
        rgDirection = "\\[(\\w*)\\]",
        rgText = "(.+)";
    var msgRegexp = new RegExp("^" + rgTimestamp + rgAgent + rgTask + rgDirection + rgText);
    var parts = text.match(msgRegexp);
    var label = parts[4];

    return {
        type,
        timestamp: parseFloat(parts[1]) * 1000,
        agent: parts[2],
        task: parts[3],
        label: label ? LABELS[label] : LABELS.NO,
        text: parts[5].trim(),
    };
}

function listMessages(container, type) {
    var lines = container.innerHTML.split("\n");
    var messages = [],
        msg;
    for (var line of lines) {
        line = line.trim();
        if (line) {
            messages.push(parseMsg(line, type));
        }
    }
    return messages;
}

function editFooter(footer) {
    if (!footer.innerHTML.trim()) {
        footer.innerHTML = "Snif, la salade de fruits n'a pas pu être terminée...";
        return;
    }

    var emojis = [];
    for (var name in TEXT_TO_EMOJI) {
        emojis.push(getEmojiImg(name));
    } 

    var div = document.createElement("div");
    div.innerHTML = emojis.join(" ");
    div.style.marginBottom = "5px";
    div.style.fontSize = "18px";
    footer.insertBefore(div, footer.firstChild);
}


var containers = {};
containers[MASTER] = document.getElementById(MASTER + "-messages");
containers[SLAVES] = document.getElementById(SLAVES + "-messages");

var messages = [];
for (var type in containers) {
    messages = messages.concat(listMessages(containers[type], type));
}

messages.sort(function(a, b) {
    var delta = a.timestamp - b.timestamp;
    if (!delta) {
        return (a.type < b.type) ? -1 : 1; 
    }
    return delta;
});

var messagesContainer = document.getElementById("messages");
for(var msg of messages) {
    addMessage(msg, messagesContainer);
}

editFooter(document.getElementById("footer"));
