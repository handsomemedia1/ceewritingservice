Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\lenovo\.gemini\antigravity\scratch\cee-writing-service"
WshShell.Run "cmd /c node run_bot.mjs >> bot_log.txt 2>&1", 0, False
