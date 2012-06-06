@echo off
goto welcome

:start
set cmd=
set /p=JSDK3^><nul
set /p cmd=

if /i "%cmd%"=="" goto start
if /i "%cmd%"=="help" goto cmd-help
if /i "%cmd%"=="help package" goto cmd-help-package
if /i "%cmd%"=="help exit" goto cmd-help-exit
if /i "%cmd%"=="about" goto cmd-about
if /i "%cmd%"=="ver" goto cmd-version
if /i "%cmd%"=="exit" goto end
if /i "%cmd%"=="cls" (
  cls
  goto start
)

echo Invalid command.
echo.
goto start

rem ------------------------

:cmd-help
echo For more information on a specific command, type HELP command-name
echo package  Package script file. 
echo exit     Quits the console program (command interpreter).
echo.
goto start

:cmd-help-package
echo Command usage:
echo PACKAGE ^<filepath^>
echo.
goto start

:cmd-help-exit
echo Quits the console program (command interpreter).
echo.
echo Command usage:
echo EXIT  
echo.
goto start

:cmd-help-
echo This command is not supported by the help utility.  Try "x /?".
echo.
goto start

:cmd-version
echo.
echo JavaScript Development Kit [Version 3.1.7.5 Beta]
echo.
goto start

:cmd-about
echo.
echo  JavaScript Development Kit V3.1.7.5 Beta
echo.
echo    author: liu denggao
echo    updated: 2011-8-4
echo    support: IE6+ ,Firefox 3.6+, Chrome 13+, Safari 5.0.5+, Opera 11.11+
echo    mail: mestime@tom.com
echo    home: http://www.wunmei.com.cn
echo.
echo  Copyright (C) 2007-2011 Rainforest Studio.
echo.
goto start

:welcome
title JavaScript Development Kit Console
echo Rainforest JavaScript Development Kit [Version 3.1.7.5 Beta]
echo Copyright (C) 2007-2011 Rainforest Studio.
echo.
goto start

rem ---------------------------

:continue
goto start

:end
echo Console exit success!
pause
@echo on
