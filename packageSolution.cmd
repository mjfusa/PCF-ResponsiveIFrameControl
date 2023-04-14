REM Update publisherName and publisherPrefix below for your environment
set publisherName=wmappconsult
set publisherPrefix=appcon
set solutionName=ResponsiveIFrameControlSolution
set controlName=responsiveIFrameControl

rmdir /s /q %solutionName%
md %solutionName%
cd %solutionName%
cmd /c pac solution init --publisher-name %publisherName% --publisher-prefix %publisherPrefix%
cmd /c pac solution add-reference --path ..\%controlName% 
msbuild /t:build /restore
if "%1"=="push" goto push
goto end
:push
cd ..\%controlName%
cmd /c pac pcf version --strategy manifest
cmd /c pac pcf push --publisher-prefix %publisherPrefix%
:end
cd ..