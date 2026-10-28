# NEXT-CAMERA: Mike OpenBot B-roll (9:16, ~38 s, separate from the 27 s Remotion cut)

1. Check that `:8765` serves `/workspace/mike-video/mock/mike.responses.yml` (the YP-approved file). Restore it if capture-v2 is still live.
2. Start a throwaway mockllm on `:8766` with `refs/openbot/mike.responses.capture-v3.yml`.
3. Off camera, point the custom provider at `:8766`. Settings never record.
4. Seed state: agent Mike, empty title, display name Meera or hidden. Delete the Launch room / Chief / Research / Builder / Launch chats and the "Friday launch review" routine. Fresh thread.
5. Create the routine `Indus Air · overnight rules check` with the hidden prompt in DIALOGUE-PLAN §2.
6. Read the `tools` array in the `requests.jsonl` from `:8766`. Set m1's tool name and arguments to match, and make sure the fixture paths are readable.
7. Dry-run: fire the routine, then type "Good catch on 7.3. Hold the alert, I'll read it tonight." and "Morning. Where did we land overnight?"
8. Pass means every request hits m1/m2/m3, `grep -c "MOCK MISS"` = 0, 0 failed chips, and the routine body isn't rendered anywhere.
9. Use curl to send `gazette watch` to `:8766` (never through the composer). It must return `[MOCK MISS — cut take]`.
10. If chips still fail, switch to M1-PLAIN. If the routine body renders, use the B1 fallback line. Then re-dry-run.
11. Send YP the YAML diff and wait for the ok. No camera before it.
12. After the ok: merge into the live yml, restart `:8765`, switch the provider back to `:8765`, and repeat step 7 once.
13. Set the viewport to 9:16 (720×1280). The capture region holds the chat column only: no sidebar, title bar, model picker or timestamps.
14. Roll B2 to B7 in one continuous take. Type at human speed, never hover the routine header, never tap `Review alert →`.
15. Cold-read every frame against the fail table in DIALOGUE-PLAN §5. Any hit: cut, fix off camera, re-dry-run.
16. If two takes die after fixes, stop. The call becomes Remotion only; log one line in STATUS.
17. Post: chips, captions and end card exactly as in §1. Export as its own 9:16 file under `refs/openbot/takes/`.
18. Write one STATUS line with the take path and the cold-read result. Not intercut into the 27 s cut.
