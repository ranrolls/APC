<?php
// Copyright (C) 2003-2010 National Association of REALTORS(R)
//
// All rights reserved.
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, and/or sell copies of the
// Software, and to permit persons to whom the Software is furnished
// to do so, provided that the above copyright notice(s) and this
// permission notice appear in all copies of the Software and that
// both the above copyright notice(s) and this permission notice
// appear in supporting documentation.

date_default_timezone_set('UTC');

$u_time = '12:41:00';
$s_time = '08:41:00';

$value = calculateOffset($s_time, $u_time);

echo ($value);
echo ('<br>');

     function calculateOffset($s_time,
                              $u_time)
     {
          $sTime = strtotime($s_time);
          $uTime = strtotime($u_time);
          return ($sTime-$uTime)/3600;
     }

?>
