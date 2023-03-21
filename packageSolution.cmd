rmdir /s /q ResponsiveIFrameControlSolution
md ResponsiveIFrameControlSolution
cd ResponsiveIFrameControlSolution
cmd /c pac solution init --publisher-name mwappconsult --publisher-prefix wmappcon
cmd /c pac solution add-reference --path ..\responsiveIFrameControl 
msbuild /t:build /restore
if "%1"=="push" goto push
goto end
:push
REM Note: Increment version in manifest prior to push to update existing deployment
cd ..\responsiveIFrameControl
cmd /c pac pcf version --strategy manifest
cmd /c pac pcf push --publisher-prefix wmappcon
:end
cd ..


